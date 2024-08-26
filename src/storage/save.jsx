function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export default save;
