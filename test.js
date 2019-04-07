let testArray = [];

QUnit.test( "checkArray function test", function( assert ) {
    assert.ok( checkArray([]) == false, "passing the empty array" );
    assert.ok( checkArray(['only value']) == false, "passing the one value in array" );
    assert.ok( checkArray(['first value',
                           'second value']) == true, "passing array contains two values" );
    assert.ok( checkArray(['first value',
                           'second value', 
                           'third value',
                           'fourth value',
                           'fifth value']) == true, "passing array contains several values" );
  });

QUnit.test( "isContained function test", function( assert ) {
    assert.ok( isContained('Lorem ipsum', 'rem') == true, "The string 'Lorem ipsum' contains the string 'rem'" );
    assert.ok( isContained('Lorem ipsum', 'r em') == false, "The string 'Lorem ipsum' does not contain the string 'r em'" );
  });

QUnit.test( "maxValue function test", function( assert ) {
    assert.ok( maxValue(3, 2, 1) == true, "Value '3' is greater than value '2'" );
    assert.ok( maxValue(2, 3, 1) == false, "Value '2' is less than value '3'" );
    assert.ok( maxValue(3, 3, 1) == false, "Value '3' is not greater than value '3', and the first value chosen from a number of equal values" );
    assert.ok( maxValue(3, 3, 0) == true, "Value '3' is not greater than value '3', and the last value chosen from a number of equal values" );
  });

QUnit.test( "removeOdd function test", function( assert ) {
    testArray = [
        '1122',
        '22'
    ];
    assert.deepEqual( removeOdd(testArray, 1), ["1122"], "The initial array ['1122','22'] modified to ['1122'] (deleting odd string)" );
  });

QUnit.test( "merge function test", function( assert ) {
    assert.equal( merge('Lorem ', 'm ipsum', 2), 'Lorem ipsum', "merging two strings with overlap into one string" );
    assert.equal( merge('Lorem ', 'ipsum', 0), 'Lorem ipsum', "concatenating two strings without overlap" );
  });

QUnit.test( "findOverlap function test", function( assert ) {
    assert.equal( findOverlap('11111 2222', '2222 3333'), 4, "The overlap of strings '11111 2222' and '2222 3333' = 4" );
    assert.equal( findOverlap('11111 22 22', '2222 3333'), 2, "The overlap of strings '11111 22 22' and '2222 3333' = 2" );
    assert.equal( findOverlap('11111 2222', '3333'), 0, "The overlap of strings '11111 2222' and '3333' = 0" );
    assert.equal( findOverlap('    ', '  '), 2, "The overlap of strings '    ' (four spaces) and '  ' (two spaces) = 2" );
    assert.equal( findOverlap('11111 2222', ''), 0, "The overlap of strings '11111 2222' and '' (empty string) = 0" );
    assert.equal( findOverlap('    ', ''), 0, "The overlap of strings '    ' (four spaces) and '' (empty string) = 0" );
    assert.equal( findOverlap('', ''), 0, "The overlap of strings '' (empty string) and '' (empty string) = 0" );
  });

QUnit.test( "modifyFragments function test", function( assert ) {
    testArray = [
        '1122',
        '2222'
    ];
    assert.deepEqual( modifyFragments(testArray, 2, 0, 1), ["112222"], "The initial array ['1122','2222'] modified to ['112222'] (merging one string into the other)" );

    testArray = [
        '1122',
        '3333'
    ];
    assert.deepEqual( modifyFragments(testArray, 0, 0, 1), ["11223333"], "The initial array ['1122','3333'] modified to ['11223333'] (concatenating two strings)" );
  });

QUnit.test( "matchAndMerge function test", function( assert ) {
    testArray = [
        'all is well',
        'ell that en',
        'hat end',
        't ends well',
        'is well tha'
    ];
    assert.deepEqual( matchAndMerge(testArray), ['all is well tha',
                                                 'ell that en',
                                                 'hat end',
                                                 't ends well'                                                 
                                                ],
    "Found maximum overlap = 7 between fragment [0] and fragment [4], merged fragment [4] into fragment [0], deleted fragment [4]" );
    
    testArray = [
        'all is well that ends well',
        'hat end'
    ];
    assert.deepEqual( matchAndMerge(testArray), ['all is well that ends well'],
   "Found fragment [1] completely contained within fragment [0], deleted fragment [1]" );
    
   testArray = [
        'ends well',
        'all is well that '
    ];
    assert.deepEqual( matchAndMerge(testArray), ['all is well that ends well'],
    "Has not found overlaps or contained fragments, concatenated fragment [1] and fragment [0], deleted fragment [1]" );
  });

QUnit.test( "processing function test", function( assert ) {
    testArray = [
        'all is well',
        'ell that en',
        'hat end',
        't ends well',
        'is well tha',
        'ell'
    ];
    assert.deepEqual( processing(testArray), ['all is well that ends well'],
    "The symbols in fragments are overlapped, so the initial fragment is recovered completely. " );
    
    testArray = [
        '1111',
        '2222',
        '3333',
        '4444'
    ];
    assert.deepEqual( processing(testArray), ['4444333322221111'],
   "The symbols in fragments are not overlapped, so the final fragment is just series of concatenations." );
    
    testArray = [
        '1112',
        '2223',
        '3333',
        '4444'
    ];
    assert.deepEqual( processing(testArray), ['44441112223333'],
    "The symbols in fragments are partly overlapped, so the final fragment is partly recovered and has concatenations." );

    testArray = [
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
    ] 
    assert.deepEqual( processing(testArray), ['Nunc posuere, erat pulvinar semper viverra, magna dui vestibulum felis, eget faucibus magna sem eu ligula.'],
    "Complex fragment test 4.");

    testArray = [
        'itr maluisset has ea.',
        'Lorem ipsum do',
        'sum dolor sit amet, vi',
        'r sit amet, vis vidisse qualisqu',
        'disse qualisque appellant',
        'ellantur ut vix nihil scripto',
        'riptorem an, illud elit',
        'an, illud elitr maluisse',
        ', vis vidisse qualis',
        'se qualisque appellantur ut vix nihil scr'
    ];
    assert.deepEqual( processing(testArray), ['Lorem ipsum dolor sit amet, vis vidisse qualisque appellantur ut vix nihil scriptorem an, illud elitr maluisset has ea.'],
    "Complex fragment test 5.");
  });

  // Aderant Test
  QUnit.test("Aderant test", function( assert) {
    testArray = [  'm quaerat voluptatem.',
    'pora incidunt ut labore et d',
    ', consectetur, adipisci velit',
    'olore magnam aliqua',
    'idunt ut labore et dolore magn',
    'uptatem.',
    'i dolorem ipsum qu',
    'iquam quaerat vol',
    'psum quia dolor sit amet, consectetur, a',
    'ia dolor sit amet, conse',
    'squam est, qui do',
    'Neque porro quisquam est, qu',
    'aerat voluptatem.',
    'm eius modi tem',
    'Neque porro qui',
    ', sed quia non numquam ei',
    'lorem ipsum quia dolor sit amet',
    'ctetur, adipisci velit, sed quia non numq',
    'unt ut labore et dolore magnam aliquam qu',
    'dipisci velit, sed quia non numqua',
    'us modi tempora incid',
    'Neque porro quisquam est, qui dolorem i',
    'uam eius modi tem',
    'pora inc',
    'am al'];

    assert.deepEqual( processing(testArray), ['Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'], "Complex fragment test.")

  });