import { createContext, useEffect, useState, useMemo, useContext }from 'react'
import { supabase } from '../utils/supabaseClient'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let mounted = true

        supabase.auth.getSession().then(({ data }) => {
            if(!mounted) return
            setUser(data?.session?.user ?? null) 
            setLoading(false)
        })

        const { data:authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => {
            mounted = false
            authListener?.subscription?.unsubscribe()
        }
    }, [])

    async function signIn(email, password) {
        const { error } = await supabase.auth.signInWithPassword({email, password})
        return { ok: !error, error}
    }

    async function signOut() {
        // Only end auth session; do not touch cart rows in DB.
        const { error } = await supabase.auth.signOut()
        return { ok: !error, error }
    }

    const value = useMemo(() => {
        return {
            user, 
            loading,
            isAuthenticated: !!user,
            signIn,
            signOut,
        }
    }, [user, loading])

    return <AuthContext.Provider value ={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx ) {
        throw new Error('useAuth must be used inside AuthProvider')
    }
    return ctx
}