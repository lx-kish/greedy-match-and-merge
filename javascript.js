/** 
* The programm reconstructs the original document out of the given fragments.
*/


/** 
* Fragmented text string samples
*
* @var array
*/
let globFragments = [
   'verra, magna dui v',
   'mper viverra, magna d',
   'Nunc posuere, e',
   'ibulum felis, eget fauci',
   'ere, erat pulvinar semper v',
   'na dui vestibulum felis, eg',
   'eu ligula.',
   'iverra, magna dui vestibulum felis, eg',
   'per viverra, magna dui vestibulum f',
   ', magna dui vestibulum felis, eget fauc',
   'cibus magna sem e',
   'bus magna',
   'rra, magna dui vestibulum fel',
   'tibulum felis, eget faucibu',
   'a dui vestibulum felis, eget fau',
   're, erat pulv'
];

/** 
* Contains user choise between the first and the last matching
* in case of equal overlaps. 
*
* @var number     0 - the last matching; 1 - the first matching
*/
const globFirstLast = 1;

/** 
* Checking if the given array is empty or contains just one value
*
* @return boolean
*/
const checkArray = (array) => {
   
   let checked          = true;

   if(!array.length) {
      console.log(`The sample is impty`);
      checked          = false;
   }

   if(array.length == 1) {
      console.log(`The sample contains just one string: ${array[0]} ${'\r\n'}There is nothing to compare`);
      checked          = false;
   }

   return checked;
}

/** 
* Checking if one string contains the other string.
*
* @param string string1    The string for the search
* @param string string2    The sample for the search
*
* @return boolean
*/
const isContained = (string1, string2) => {

   return string1.indexOf(string2) > -1 ? true : false;
}

/** 
* Checking given values and returning boolean whether one value is greater
* than another or whether greater than or equal, depends on value of 
* 'firstLast' variable.
*
* @param number currentValue  Checking value
* @param number maxValue      The value what is compared with
* 
* @return boolean
*/
const maxValue = (currentValue, maxValue, firstLast) => {

   if(firstLast) {
      return currentValue > maxValue ? true : false;
   } else {
      return currentValue >= maxValue ? true : false;
   }
}

/** 
* Checking two given strings if one overlaps the other, and returning the 
* number of overlapping symbols.
*
* @param string string1    The string with suffix being checked
* @param string string2    The string with prefix being checked
*
* @return number
*/
const findOverlap = (string1, string2) => {

   let overlap          = 0;

   const length1        = string1.length;
   const length2        = string2.length;

   const minLength      = length1 < length2 ? length1 : length2;

   for(let i = 0; i < minLength; i++){

      let shift         = i + 1;

      let suffix        = string1.substring(length1 - shift, length1);
      let prefix        = string2.substring(0, shift);
      
      if (suffix === prefix) overlap = shift; 
   }

   return overlap;
}

/** 
* Removing a value in the array with the specific index.
* 
* @param fragments array   Given array for modifications
* @param number index      Index of removing value in the array
* 
* @return array
*/
const removeOdd = (fragments, index) => {

   try {
      fragments.splice(index, 1);
   } catch (error) {
      console.log(error.name );
      console.log(error.message);
   }
   
   return fragments;
}

/** 
* Merging two fragments of text string one with the other. In case of 0 overlapping
* returns simple concatenation of two strings.
* 
* @param string string1    String with suffix overlapping
* @param string string2    String with prefix overlapping
* @param number overlap    The amount of overlaping symbols
*
* @return string           Resulting string of merging
*/
const merge = (string1, string2, overlap) => {

   let subString2       = string2.substring(overlap, string2.length);

   return string1 + subString2;
}

/** 
* Replacing the value in the array with the index 'index1' by the result of merging
* of two fragments, while deleting the value with the index 'index2'.
* If the value of the variable 'overlap' is 0, replacing the value in the array 
* with the index 'index1' by the result of concatenating two fragments.
*
* @param fragments array   Given array for modifications
* @param number overlap    The number of overlapping symbols
* @param number index1     Index in the array
* @param number index2     Index in the array
* 
* @return array
*/
const modifyFragments = (fragments, overlap, index1, index2) => {

   fragments[index1] = merge(fragments[index1],
                             fragments[index2], 
                             overlap);
   removeOdd(fragments, index2);

   return fragments;
}

/** 
* Launching a series of rounds with searching the collection to find the pair
* of fragments with the maximal overlap. At the end of the search passing
* the search results into the 'modifyFragments'. 
*
* @param fragments array   Given array with values for matching and merging
* 
* @return array
*/
const matchAndMerge = (fragments) => {
   
   let prefIndex        = 0; 
   let suffIndex        = 0; 
   
   let fragment1        = '';
   let fragment2        = '';
   
   let maxOverlap       = 0;
   let currentOverlap   = 0;

   let contained        = false;
   let curContained     = false;
   
   for(let i = 0; i < fragments.length; i++) {
      
      for(let j = 0; j < fragments.length; j++) {

         if(i == j) continue;
         
         fragment1      = fragments[i];
         fragment2      = fragments[j];

         curContained = isContained(fragment1, fragment2);
         if(curContained) {
            contained   = curContained;
            maxOverlap  = 0;
            suffIndex   = i;
            prefIndex   = j;
         }
      
         if(!contained) {
            currentOverlap = findOverlap(fragment1, fragment2);
            if(maxValue(currentOverlap, maxOverlap, globFirstLast)) {
               maxOverlap  = currentOverlap;
               suffIndex   = i;
               prefIndex   = j;
            }
         }

         if(!maxOverlap && !contained) {
            suffIndex   = i;
            prefIndex   = j;
         }
      }
   }

   if(contained) {
      removeOdd(fragments, prefIndex);
   } else {
      modifyFragments(fragments, maxOverlap, suffIndex, prefIndex);
   }

   return fragments;
}

/** 
* Launching the programm with the checking the array, then repeats the iterations 
* of series of rounds until the array contains the final fragment.
* 
* @return array
*/
const processing = (fragments) => {
   
   if(!checkArray(fragments)) return;
   
   while(fragments.length > 1) {

      matchAndMerge(fragments);

   }

   return fragments;
}

processing(globFragments);
console.log(globFragments);
