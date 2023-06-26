export function displayedList(list, sortType, reversList) {
  let sortedList = [...list];

  switch (sortType) {
    case 1:
      sortedList = sortedList.sort((a, b) => a.completed - b.completed);
      break;
    case 2:
      sortedList = sortedList.sort((a, b) => b.completed - a.completed);
      break;
    case 3:
      sortedList = sortedList.sort((a, b) => a.id - b.id);
      break;
    case 4:
      sortedList = sortedList.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
  }

  const reversedList = [...sortedList].reverse();
  const displayedList = reversList ? reversedList : sortedList;

  return displayedList;
}
