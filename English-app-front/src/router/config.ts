
const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
    hide_header: false,
    hide_footer: false
  },
  {
    path: ["/login"],
    exact: true,
    component: "Login",
    hide_header: false,
    hide_footer: false
  },
  {
    path: ["/confirm"],
    exact: false,
    component: "ConfirmEmail",
    hide_header: false,
    hide_footer: false
  },
  {
    path: ["/restore-password"],
    exact: false,
    component: "ChangePassword",
    hide_header: false,
    hide_footer: false
  },
  {
    path: ["/lk"],
    exact: false,
    component: "Lk",
    hide_header: true,
    hide_footer: true
  },
  {
    path: ["/free"],
    exact: false,
    component: "Free",
    hide_header: true,
    hide_footer: true
  },
  {
    path: ["/quick-registration"],
    exact: false,
    component: "QuickRegistrationPage",
    hide_header: true,
    hide_footer: true
  },
  {
    path: ["/cooperation"],
    exact: false,
    component: "Cooperation",
    hide_header: true,
    hide_footer: true
  },
];

export default routes;
