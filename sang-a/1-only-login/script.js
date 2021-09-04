const signoutButton = document.querySelector(".signout");

const handleSignin = (googleUser) => {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Full Name: " + profile.getName());
    console.log("Given Name: " + profile.getGivenName());
    console.log("Family Name: " + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
};

const handleSignout = () => {
    console.log("sign out");
    const authInst = window.gapi.auth2.getAuthInstance();
    authInst.signOut().then(() => {
        // eslint-disable-next-line
        console.log("User Signed Out!!!");
    });
};

const init = () => {
    signoutButton.addEventListener("click", handleSignout);
};

init();
