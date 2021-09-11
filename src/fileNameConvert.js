

module.exports = function fileNameConvert(){
    let locationInfo;
    let shortDateFormatSting;
    let finalName;
    let date ;

    this.splitName = function (fileName){
        
        let array = fileName.split(',');
        if(array.length === 2){
            date = new Date(fileName);
        }
        else if( array.length ===3 ){
            locationInfo = array[0].toString();
            let longDate = array[1] + array[2];
            date = new Date(longDate);
        }
        else if (array.length ===1){
            return fileName;
        }
        let monthString = this.padZeroBeforeIfNecessary(date.getMonth() + 1);

        let dateString = this.padZeroBeforeIfNecessary(date.getDate());

        shortDateFormatSting = date.getFullYear() + '-' + monthString.trim() + '-' + dateString.trim();
        finalName = shortDateFormatSting;
        if(array.length ===3 ){
            finalName = shortDateFormatSting + '@' +locationInfo.trim();
        }
        return finalName;
    };

    this.padZeroBeforeIfNecessary = function(NumInt){
        let str ;
        if(NumInt < 10){
            str = '0' + String(NumInt);
        }
        else{
            str = String(NumInt);
        }
        return str.toString();
    };
}