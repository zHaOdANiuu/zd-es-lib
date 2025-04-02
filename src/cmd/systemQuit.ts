/** 快速退出ae */
const systemQuit = () => {
  system.callSystem('taskkill /im AfterFX.exe /f')
}

export default systemQuit
