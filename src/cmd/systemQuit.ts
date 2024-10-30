/** 快速退出ae */
function systemQuit()
{
      system.callSystem('taskkill /im AfterFX.exe /f');
}

export default systemQuit;
