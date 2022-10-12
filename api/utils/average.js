const avergare = (reviews) =>{
    reviews.reduce((avg, value, _, {
        length
      }) => {
        return avg + (value.rate / length);
      }, 0);
} 

  module.exports = avergare;