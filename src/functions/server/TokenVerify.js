import { OAuth2Client } from "google-auth-library";



async function verify(verifyToken) {
  try {
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    if (verifyToken.type === "google") {
      const ticket = await client.verifyIdToken({
        idToken: verifyToken.token,
        audience: client.clientId,
      });

      if (await ticket.getPayload()?.iss == 'accounts.google.com') {
        return 'validate whit google';
      } else {
        return 'token no valido'
      }

    }
    throw new Error("Invalid Token Type");
  } catch (error) {
    throw error;
  }
}

export default verify;
