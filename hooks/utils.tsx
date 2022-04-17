export function getTodayDate(){
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '년 ' + month  + '월 ' + day + '일';

    return dateString;
}