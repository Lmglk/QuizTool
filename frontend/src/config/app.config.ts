const SERVER_PORT = 4200;

export const config = {
  SERVER_API: `${window.location.origin.replace(window.location.port, SERVER_PORT.toString())}/api`
};