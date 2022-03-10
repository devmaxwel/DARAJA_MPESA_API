import axios from "axios";

export const accessToken = async () => {
  const consumerKey = process.env.consumerKey;
  const consumerSecret = process.env.consumerSecret;
  const url =
    `https://${process.env.subdomain}.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`;

  const { data } = await axios.get(url, {
    auth: {
      username: consumerKey,
      password: consumerSecret,
    },
  });
  console.log(data.access_token)
  return data.access_token;
  
};
