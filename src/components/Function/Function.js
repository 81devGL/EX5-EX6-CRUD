//---- Handle string---Search  engine----
function handleString(str) {
  if (str) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
      str = str.replace(/Đ/g, 'D');
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  h
      str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      str = str.replace(/ + /g, ' ');
      str = str.trim();
      // Remove punctuations
      str = str.charAt(0).toUpperCase() + str.slice(1);
      return str;
  }
  return str;
}
//Format phone Custom
const normalizePhone = value => {
if (!value) return value;
const onlyNums = value.replace(/[^\d]/g, "");
if (onlyNums.length <= 3) return onlyNums;
if (onlyNums.length <= 6)
  return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)}`;
return `${onlyNums.slice(0, 3)} ${onlyNums.slice(3, 6)} ${onlyNums.slice(
  6,
  10
)}`;
};
//format money handle
function numberWithCommas(x) {
if(x)
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
//total order handle
function totalHanlder(array,id){
  if(array){
    let total = array.reduce((agr,item,i)=>{
      if(item){
        if(i !==id)
        agr += item.totalproduct
      }
      
     return agr 
  },0)
  return total
  }
  }
  
//get number
function removeString(thestring){
 return thestring.replace(/[^0-9]/g, '')

}

//report handle
function totalOrderCartReport(array, element){
if(element === 'total'&& array){
  let total = array.reduce((agr, item)=>{
    agr += item.total
  
    return agr
  },0)
  return total
}else if(element ==='debit'&&array){
  let total = array.reduce((agr, item)=>{
    if(item.debit)
    {agr += item.debit}
    return agr
  },0)
  return total
}
}

const handleFilter = (value,array,setArray, refCustomer) => {
  const newFilter = array.filter((item) => {
    console.log(item)
    if(!item.address) item.address = 'Hà nội'
    if(!item.full_name) item.full_name ="aaaaaaaaa"
    if(!item.mobile) item.mobile='000000000013'
      return (
          handleString(item.full_name).toLowerCase().includes(handleString(value).toLowerCase()) ||
          item.mobile.toLowerCase().includes(value.toLowerCase()) ||
          handleString(item.address).toLowerCase().includes(handleString(value).toLowerCase()) 
      );
  });

  if (value === '') {
    setArray(refCustomer);
  } else {
    setArray(newFilter);
  }
};

export { handleString, normalizePhone,numberWithCommas,totalHanlder,removeString ,totalOrderCartReport,handleFilter};
