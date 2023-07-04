exports.handler = async function (event, context) {
  if (event.queryStringParameters.secret === process.env.BUILD_HOOK_SECRET) {
    const response = await fetch(process.env.BUILD_HOOK_URL, {
      method: "POST",
    });
    return {
      statusCode: 200,
      body: "O processo de atualização dos índices do site está em andamento e deverá ser concluído em alguns minutos.",
    };
  } else {
    return {
      statusCode: 403,
      body: "Ops, houve um problema. Verifique se a URL está correta. Se o problema persistir, entre em contato com o responsável pelo site.",
    };
  }
};
