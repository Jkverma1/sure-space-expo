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
