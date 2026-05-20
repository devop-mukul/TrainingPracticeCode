import useTheme from '../context/theme'

function ThemeButton() {
    const { themeMode, darkTheme, lightTheme } = useTheme()
    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if(darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }
  return (
    <div style={{padding:50, textAlign:'center'}}>ThemeButton
        <input 
            type="checkbox"
            value=""
            onChange={onChangeBtn}
            checked={themeMode === "dark"}
        />
    </div>
  )
}

export default ThemeButton