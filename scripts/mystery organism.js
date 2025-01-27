// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


//Returns a P. Aequor specimen as an object. Needs specific num and sequence passed
function pAequorFactory(specimenNum, dnaSeq) {
  return {
    specimenNum,
    dnaSeq, 
    mutate() {
      const baseIndex = Math.floor(Math.random() * (this.dnaSeq.length - 1));
      let i = 0;
      do {
        const suggBase = returnRandBase();
        if (suggBase !== this.dnaSeq[baseIndex]) {
          this.dnaSeq[baseIndex] = suggBase;
          i++;
        }
      } while (i === 0);
      console.log(`Base at index ${baseIndex} changed to ${this.dnaSeq[baseIndex]}`)
    },
    compareDNA(otherSpec) {
      let sharedBases = 0;
      for (i = 0; i < this.dnaSeq.length; i++) {
        if (this.dnaSeq[i] === otherSpec.dnaSeq[i]) {
          sharedBases++;
        }
      }
      const sharedPc = ((sharedBases / 15) * 100);
      //console.log(`Specimen #${this.specimenNum} and specimen #${otherSpec.specimenNum} have ${sharedPc}% DNA in common.`);
      return sharedPc;
    },
    willLikelySurvive() {
      let GCCount = 0;
      for (base of this.dnaSeq) {
        if (base === 'G' || base === 'C') {
          GCCount++;
        }
      }
      const GCPc = (GCCount / this.dnaSeq.length) * 100;
      //console.log(`G/C % = ${GCPc.toFixed(2)}`);
      return GCPc >= 50;
      //OR  const GCsOnly = this.dnaSeq.filter(base => base === 'C || base === 'G');
      //    return CGsOnly.length / this.dnaSeq.length >= 0.6; 
    },
    complementStrand(){
      return this.dnaSeq.map(base => {
        switch (base) {
          case 'A':
            return 'T';
            break;
          case 'T':
            return 'A';
            break;
          case 'G':
            return 'C';
            break;
          case 'C':
            return 'G';
            break;
        }
      })
    }
  };
}

let specimenLibrary

function generateLibrary() {
  const library = []
  let nextSpec = 1
  while (library.length < 30) {
    candidate = pAequorFactory(nextSpec, mockUpStrand());
    if (candidate.willLikelySurvive()) {
      library.push(candidate);
    }
    nextSpec++;
  }
  specimenLibrary = library;
}


//pAequor1000 = pAequorFactory(1000, mockUpStrand());
//pAequor2000 = pAequorFactory(2000, mockUpStrand());


function findClosestRelative(specimen) {
  //creates an array containing objects listing every other specimen's number and similarity with the passed specimen
  const sharedArr = [];
  specimenLibrary.forEach(relative => {
    if (relative.specimenNum !== specimen.specimenNum) {
      sharedArr.push({specimenNum: relative.specimenNum, similarity: specimen.compareDNA(relative)})
    }
  })
  //test: console.log(sharedArr);

  //reduces above array to a single object with the highest (or latest joint-highest) similarity, and returns that object thus
  //identifies the specimen number of the passed specimen's closest relative
  return sharedArr.reduce((soFar, curr) => {
    if (curr.similarity >= soFar.similarity) {
      return curr;
    } else {
      return soFar;
    }
  }, {similarity: 0});
}

function findClosestPair (specimenList) {
  //creates an array detailing the number of and similarity to each specimen's closest relative
  const eachSpecsClosest = specimenList.map(specimen => {
    return {
      specimenNum: specimen.specimenNum,
      closestRel: findClosestRelative(specimen).specimenNum,
      similarity: findClosestRelative(specimen).similarity
    };
  });
  // test: console.log(eachSpecsClosest);

  //returns the first pair with the joint-highest similarity
  return eachSpecsClosest.reduce((soFar, curr) => {
    if (curr.similarity > soFar.similarity) {
      return curr;
    } else {
      return soFar;
    }
  }, {similarity: 0});
}

//returns a full specimen object from an array when passed its specimen number
function getSpecimen(list, num) {
  return list.reduce((x, curr) =>{
    if (curr.specimenNum === num) {
      return curr;
    } else {
      return x;
    }
  }, {});
}

//iterates a specimen through generations, mutating once per generation, outputting the details of the process
//and the result as a number of generations before .willLikelySurvive() returns false
function simulateEvolution(specimen) {
  const candidate = specimen;
  let generation = 0


  do {
    console.log(`Generation ${generation}:`);
    if (generation === 0) {
      console.log('Starting DNA sequence: ');
    } else {
      candidate.mutate();
    }
    console.log(candidate.dnaSeq.join(''));

    if (candidate.willLikelySurvive()) {
      console.log(`Fit`);
    } else {
      console.log(`Unfit`);
    }
    console.log('');
    
    generation++;

  } while (candidate.willLikelySurvive())

  console.log(`Candidate survived ${generation - 1} mutations`)

  return generation - 1;
}

/*console.log(`Most- or joint-most-closely-related pair in the P. Aequor Specimen Library is:`);
console.log(`Specimen ${closestPair.specimenNum} & Specimen ${closestPair.closestRel} with a DNA sequence similarity of ${closestPair.similarity.toFixed(2)}%.`);*/

/*console.log(getSpecimen(specimenLibrary, closestPair.specimenNum));
console.log(getSpecimen(specimenLibrary, closestPair.closestRel));

const pAequor1000 = pAequorFactory(1000, mockUpStrand());

console.log(pAequor1000);
simulateEvolution(pAequor1000);
console.log(pAequor1000);*/

function getSpecimenSummary(specimen) {
  const specimenNum = specimen.specimenNum;
  const dnaSeq = specimen.dnaSeq.join('');
  const evolution = simulateEvolution(specimen)

  return `Example specimen: ${specimenNum}<br>DNA sequence: ${dnaSeq}<br>
    Evolution prognosis: ${evolution} generations survived`
}

function webOutput() {
  generateLibrary();
  console.log(specimenLibrary);

  const exampleSpec = specimenLibrary[Math.floor(Math.random() * specimenLibrary.length)]

  const closestPair = findClosestPair(specimenLibrary);

  document.querySelector("#MO-output").innerHTML = getSpecimenSummary(exampleSpec) + `<br><br> 
  Most-closely-related pair in the P. Aequor Specimen Library is:<br>
  Specimen ${closestPair.specimenNum} & Specimen ${closestPair.closestRel}<br>with a DNA sequence similarity of 
  ${closestPair.similarity.toFixed(2)}%.`;

}