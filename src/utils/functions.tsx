import { Share } from 'react-native';

export const sharePost = async ({
  postId,
  message = '',
}: {
  postId: string;
  message?: string;
}) => {
  const appLink = 'https://apps.apple.com/in/app/sure-space/id6730121865';
  const postLink = `https://surespace.app/post/${postId}`;

  try {
    await Share.share({
      message: message
        ? `${message}\n\nCheck out the post here: ${postLink}\n\nGet the app: ${appLink}`
        : `Check out this post on Sure Space: ${postLink}\n\nDownload the app: ${appLink}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error sharing:', error.message);
    } else {
      console.log('Error sharing:', error);
    }
  }
};

export const jwtDecode = (token: string) => {
  const base64Url = token?.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const rawPayload = atob(base64);
  const jsonPayload = decodeURIComponent(
    Array.prototype.map
      .call(rawPayload, (c) => {
        return `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`;
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
