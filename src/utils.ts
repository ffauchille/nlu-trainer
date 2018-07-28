export const urlify = (label: string) => label.replace(" ", "-").toLowerCase()

function doRemove<T>(arr:T[], index: number): T[] {
    if (index > -1) {
      var copy = arr.splice(0);
      copy.splice(index, 1);
      return copy;
    } else return arr;
  }

export function removeAtIndex<T>(
    arr: T[],
    predicate: (k: T) => boolean
  ): T[] {
    let found = arr.findIndex(predicate);
    return doRemove(arr, found)
  };
  