type TypeAndValues = {
  type: string;
  values?: Array<string> | undefined;
};
type Match = Array<string>;
type Variant = Array<string> | undefined;


export const getProducts = (
  existing: Array<TypeAndValues> = [],
  updating: Array<TypeAndValues> = [],
  _variants: Array<Variant> = []
): Array<Match> =>
{
  const result: Array<Match> = [];
  const updatedExisting: Array<TypeAndValues> = existing;
  let variants = _variants;

  // Update styles from existing and updating
  updating.forEach((typeAndValues: TypeAndValues) => {
    
    //Existing types to array
    const existingTypes = updatedExisting.map((typeAndValues: TypeAndValues) => {
      return typeAndValues.type;
    })

    const { type } = typeAndValues;
    const matchingIndex = existingTypes.indexOf(type);

    if (matchingIndex != -1 && typeAndValues.values) { // update

      // tricky
      const afterValues = typeAndValues.values;
      const beforeValues = updatedExisting[matchingIndex].values;

      const difference = afterValues.filter(x => !beforeValues.includes(x));

      const removalValues = beforeValues.filter(x => !afterValues.includes(x));
      if (removalValues.length) {
        removalValues.forEach(removalValue => {
          variants = variants.filter(variant => {
            return !variant.includes(removalValue);
          })
        });
      }

      if (difference.length) {
        variants.push(difference)
        updatedExisting[matchingIndex] = typeAndValues;
      }
    }
    else if (matchingIndex != -1 && !typeAndValues.values) { // delete
      
      // remove all variants including that type
      const values = updatedExisting[matchingIndex].values;
      variants = variants.map(variant => {
        return variant.filter(variantValue => {
          return !values.includes(variantValue);
        })
      });
      updatedExisting.splice(matchingIndex, 1);
    }
    else if (typeAndValues.values) { // add
      updatedExisting.push(typeAndValues);
    }
  });

  const isVariant = (match: Array<string>): boolean => {
    if (!variants.length) return true;
    return variants.some(variant => {
      return variant.every(type => match.includes(type));
    });
  };

  const generateMatches = (index: number, matchSoFar: Array<string>): void => {
    if (index === updatedExisting.length) {
      if (isVariant(matchSoFar)) {
        result.push(matchSoFar);
      }
      return;
    }
    updatedExisting[index].values.forEach((added: string) => {
      generateMatches(index + 1, [...matchSoFar, added]);
    });
  };
  generateMatches(0, []);

  return result;
};

