import jwt from 'jsonwebtoken';
import axios from 'axios';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 217;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData.id;
      req.token = token;
    } else {
      try {
        const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
        console.log(googleResponse.data);
        // Validate the response from Google
        if (googleResponse.data.aud === process.env.GOOGLE_AUTH_CLIENT_ID) {
          // Token is valid
          req.userId = googleResponse.data.sub;
          req.token = token;
        } else {
          // Invalid token
          console.error('Invalid Google access token');
          res.status(401).json({ message: 'Please authenticate.' });
          return;
        }
      } catch (error) {
        console.error('Error verifying Google access token:', error.message);
        res.status(401).json({ message: 'Please authenticate.' });
        return;
      }
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate.', error });
  }
};

export default auth;
