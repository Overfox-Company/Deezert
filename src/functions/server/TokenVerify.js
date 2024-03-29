import { OAuth2Client } from "google-auth-library";



async function verify(verifyToken) {
  try {
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    if (verifyToken.type === "google") {
      const ticket = await client.verifyIdToken({
        idToken: verifyToken.token,
        audience: client.clientId,
      });
      console.log(await ticket.getPayload())
      if (await ticket.getPayload()?.iss == 'accounts.google.com') {
        return ticket.getPayload();
      } else {
        return 'token no valido'
      }

    }
    throw new Error("Invalid Token Type");
  } catch (error) {
    console.log(error)
    console.log('error validando el token xq es viejo')
    return '401'
  }
}

export default verify;
