var suits = ['clubs', 'hearts', 'spades', 'diamonds'];

var ranks = ['ace', 'king', 'queen', 'jack', 'ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two'];

var hand = [
        { rank:'five', suit: 'diamonds' },
        { rank:'five', suit: 'hearts' },
        { rank:'five', suit: 'spades' },
        { rank:'five', suit: 'clubs' },
        { rank:'three ', suit: 'diamonds' }
      ];

var getRank = (card) =>{
	switch(card){
		case 'ace'		: return 14;
		case 'king'		: return 13;
		case 'queen'	: return 12;
		case 'jack'		: return 11;
		case 'ten'		: return 10;
		case 'nine'		: return 9;
		case 'eight'	: return 8;
		case 'seven'	: return 7;
		case 'six'		: return 6;
		case 'five'		: return 5;
		case 'four'		: return 4;
		case 'three'	: return 3;
		case 'two'		: return 2;
		default			: return false;
	}
}

var containsNTimes = (handRanks, elementToBeSearched, minimum) =>{
	var count = 0;
	var flag = false;
	for( key in handRanks){
		if(handRanks[key] === elementToBeSearched){
			count++;
		}
	}
	if(count === minimum){
	    flag = true;
	}
	return flag;
}

var isOrdered = (handRanks) =>{
	var result = false;
	var highestRank = 0;
	var lowestRank = 0;
	for(var i = 0 ; i < handRanks.length; i++){
		if( getRank(handRanks[i]) > getRank(handRanks[highestRank])){
			highestRank = i;
		}
	}
	for(var i = 0 ; i < handRanks.length; i++){
		if( getRank(handRanks[i]) < getRank(handRanks[lowestRank])){
			lowestRank = i;
		}
	}
	var differenceOfRank = highestRank - lowestRank;
	if(differenceOfRank >= 4){
		result = true;
	}
	return result;
}

var numberOfSuits = (handSuits) =>{
	differenceCount = 0;
	console.log('differenceCounts');

	for(var i = 0; i < handSuits.length; i++){
		if(handSuits[i] != handSuits[i+1]){
			differenceCount++;
			console.log(differenceCount);
		}
	}
}

//ONE PAIR
var hasOnePair = (hand) =>{
  let result = false;
  let numberOfPairs = 0;
  let handRanks;
  handRanks = hand.map(function (card) {
    return card.rank;
  });
  ranks.forEach(function (rank) {
    let flag = containsNTimes(handRanks, rank, 2);
    if (flag) {
      result = true;
      numberOfPairs++;
    }
  });
  if(numberOfPairs > 1){
    result = false;
  }
  return result;
};

//TWO PAIR
var hasTwoPair = (hand) =>{
  var result = false;
  var numberOfPairs = 0;
  var handRanks;

  handRanks = hand.map(function (card) {
    return card.rank;
  });

  ranks.forEach(function (rank) {
    var flag = containsNTimes(handRanks, rank, 2);
    if (flag) {
      result = true;
      numberOfPairs++;
    }
  });

  if(numberOfPairs <2 ){
    result = false;
  }

  return result;
};

//THREE OF A KIND
var isThreeOfAKind = (hand) =>{
  var result = false;
  var handRanks;

  handRanks = hand.map(function (card) {
    return card.rank;
  });

  ranks.forEach(function (rank) {
    var flag = containsNTimes(handRanks, rank, 3);
    if (flag) {
      result = true;
    }
  });

  return result;
}

//FOUR OF A KIND
var isFourOfAKind = (hand) =>{
  var result = false;
  var handRanks;

  handRanks = hand.map(function (card) {
    return card.rank;
  });

  ranks.forEach(function (rank) {
    var flag = containsNTimes(handRanks, rank, 4);
    if (flag) {
      result = true;
    }
  });

  return result;
}

//FLUSH
var isFlush = (hand) =>{
  var result = false;
  var handSuits = hand.map(function (card) {
    return card.suit;
  });
  suits.forEach(function (suit) {
    var flag = containsNTimes(handSuits, suit, 5);
    if (flag) {
      result = true;
    }
  });
  return result;
}

//FULL HOUSE
var isFullHouse = (hand) =>{
	var result = false;
	//console.log(hand)

	var handHasThreeOfAKind = isThreeOfAKind(hand);
	//var handHasOnePair = hasOnePair(hand);
  var handHasTwoPair = hasTwoPair(hand);
	//console.log('handHasThreeOfAKind');
	//console.log(handHasThreeOfAKind);
	//console.log('handHasTwoPair');
	//console.log(handHasTwoPair);
	if( handHasThreeOfAKind || handHasTwoPair){
		result = true;
	}
	return result;
}

//STRAIGHT
var isStraight = (hand) =>{
  var result = false;
  var numberOfPairs = 0;
  var handRanks = hand.map(function (card) {
    return card.rank;
  });

  var handSuits = hand.map(function (card) {
    return card.suit;
  });

  ranks.forEach(function (rank) {
    if (containsNTimes(handRanks, rank, 2)) {
      numberOfPairs++;
    }
  });

  var hasNoDifferentSuit = false;
  suits.forEach(function (suit) {
        var hasNoDifferentSuit = containsNTimes(handRanks, suit, 5);
      });

  //console.log('numberOfPairs   ->  ' + numberOfPairs);

  if(numberOfPairs === 0){
    if(isOrdered(handRanks)){
      if(!hasNoDifferentSuit){
        result = true;
      }
    }
  }
  return result;
}

//STRAIGHT FLUSH
var isStraightFlush = (hand) =>{
  var result = false;
  var isHandStraight = isStraight(hand);
  var isHandFlush = isFlush(hand);

  if( isHandStraight || isHandFlush){
    result = true;
  }
  return result;
}

//ROYAL FLUSH
var isRoyalFlush = (hand) =>{
	var result = false;

	var isHandStraightFlush = isStraightFlush(hand);

	var handRanks = hand.map(function (card) {
		return card.rank;
	});

	var royal = {
		ace 	: false,
		king 	: false,
		queen : false,
		jack 	: false,
		ten		: false
	}
	//to check if it is royal
	for(key in handRanks){
		switch(handRanks[key]){
			case 'ace' : royal.ace = true;
				break;
			case 'king' : royal.king = true;
				break;
			case 'queen' : royal.queen = true;
				break;
			case 'jack' : royal.jack = true;
				break;
			case 'ten' : royal.ten = true;
				break;
		}
	}

	if(royal.ace && royal.king && royal.queen && royal.jack && royal.ten){
		result = true;
	}

	return result;
}

//HAND ASSESSOR FUNCTION
var handAssessor = (hand) =>{
	var handStrength = {
		onePair     : hasOnePair(hand),
		twoPair 		: hasTwoPair(hand),
		threeOfAKind 	: isThreeOfAKind(hand),
		fourOfAKind 	: isFourOfAKind(hand),
		straight 		: isStraight(hand),
		flush 			: isFlush(hand),
		straightFlush	: isStraightFlush(hand),
		royalFlush 		: isRoyalFlush(hand),
		fullHouse		: isFullHouse(hand),
	};

	if( !handStrength.onePair && !handStrength.twoPair && !handStrength.threeOfAKind && !handStrength.fourOfAKind && !handStrength.straight && !handStrength.flush && !handStrength.straightFlush && !handStrength.royalFlush && !handStrength.fullHouse){
		console.log('Bust !');
	}
	console.log(handStrength);
}

var init = () =>{
	handAssessor(hand);
}

init();




