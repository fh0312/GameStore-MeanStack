export interface User {
    _id: String;
    username: string;
    name: string
    password: string;
    profilePicture: {
      data: Blob;
      contentType: string;
    };
  }