import { supabase } from '../utils/supabaseClient'

export async function fetchCartItems(userId) {
    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        throw error
    }

    return data ?? []
}

export async function addToCart(userId, product) {
    const { data: existingItem, error: findError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', product.id)
        .maybeSingle()

    if (findError) {
        throw findError
    }

    if (existingItem) {
        const { data, error } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + 1 })
            .eq('id', existingItem.id)
            .select('*')
            .single()

        if (error) {
            throw error
        }

        return data
    }

    const { data, error } = await supabase
        .from('cart_items')
        .insert({
            user_id: userId,
            product_id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image,
        })
        .select('*')
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function updateCartItemQuantity(cartRowId, quantity) {
    const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartRowId)
        .select('*')
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function removeCartItem(cartRowId) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartRowId)

    if (error) {
        throw error
    }
}

export async function clearUserCart(userId) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)

    if (error) {
        throw error
    }
}

export async function upsertCartItems(userId, items) {
    if (!items.length) {
        return []
    }

    const payload = items.map((item) => ({
        user_id: userId,
        product_id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
    }))

    const { data, error } = await supabase
        .from('cart_items')
        .upsert(payload, { onConflict: 'user_id,product_id' })
        .select('*')

    if (error) {
        throw error
    }

    return data ?? []
}
