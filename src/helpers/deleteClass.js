export const deleteClass = (links, selectedClass) => {
  links.forEach(link => {
    link.classList.remove(selectedClass);
  })
}
