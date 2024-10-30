/** 一个更详细的抛出 */
function $error(error: Error)
{
      alert (`#line: ${error.line};
#type: "${error.name}";
#error: "${error.message}";
#fileName: "${error.fileName}";`);
      throw error.message;
}

export default $error;
