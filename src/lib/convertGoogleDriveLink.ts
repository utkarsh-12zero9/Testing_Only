export const convertGoogleDriveLink = (viewLink: string) => {
  if (typeof viewLink === "string" && viewLink.includes("drive.google.com")) {
    const fileId = viewLink.split("/d/")[1]?.split("/")[0];
    return `https://drive.google.com/uc?id=${fileId}`;
  }
  return viewLink;
};