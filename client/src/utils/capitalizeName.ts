
export function capitalizeNames(name:string) {
  if (!name) {
    return ''; // Return an empty string if the name is falsy
  }

  const names = name.split(' '); // Split the name by space into an array of names
  const capitalizedNames = names.map((name) => {
    // Capitalize the first letter of each name
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  });

  return capitalizedNames.join(' '); // Join the capitalized names with a space
}
