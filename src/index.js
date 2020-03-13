function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    let arr=[];
    let term='';
    let checkfirst=0;
    let checksecond=0;
    if(str.match(/[(]/g)!=null)
    {
        checkfirst=str.match(/[(]/g).length;
    }
    if(str.match(/[)]/g)!=null)
    {
        checksecond=str.match(/[)]/g).length;
    }
    if(checkfirst!=checksecond!=0)
    {
        throw new RangeError("ExpressionError: Brackets must be paired");
    }    
    str=str.split('');
    while (str.indexOf('(')!=-1)
    {
        let firstsym=str.lastIndexOf(('('));
        let secondsym=str.indexOf((')'),firstsym);
        for(let count=firstsym;count<secondsym+1;count++)
        {
            if(count==firstsym || count==(secondsym))
            {
                term+=str[count];
                continue;
            }
            if(str[count]==' ')
            {
                term+=str[count];
                continue;
            }
            if(str[count].match(/[0-9]{1}/g)!=null)
            {
                arr.push(+str[count]);
            }
            else
            {
                arr.push(str[count]);
            }
            term+=str[count];
        }
        while(arr.indexOf(".")!=-1)
        {
            let element_num=arr.indexOf(".");
            let arrfir=arr.slice(element_num+1,);
            if(arrfir.join('').search(/[+]|[*]|[/]|[-]/g)!=-1)
            {
                arrfir=arrfir.splice(0,arrfir.join('').search(/[+]|[*]|[/]|[-]/g)).join('');
            }
            else
            {
                arrfir=arrfir.join('');
            }
            arr[element_num]=arrfir;
            arr.splice(element_num+1,arrfir.length);
            let arrsec=arr.slice(0,element_num);
            let elem_num=0;
            if(arrsec.reverse().join('').search(/[+]|[*]|[/]|[-]/g)!=-1 && arrsec.join("").search(/^[-][0-9]*/g)==-1)
            {
                elem_num=arrsec.length-arrsec.join('').search(/[+]|[*]|[/]|[-]/g);
                arrsec.reverse();
                arrsec=arrsec.splice(elem_num,).join('');
            }
            else
            {
                if(arrsec[0]!='-')
                {
                    arrsec.reverse();
                }
                arrsec=arrsec.join("");
            }
            arr[elem_num]=arrsec;
            if(arrsec.length!=1)
            {
                arr.splice(elem_num+1,arrsec.length-1);
            }
            arr[elem_num]=+(arr[elem_num]+'.'+arr[elem_num+1]);
            arr.splice(elem_num+1,1);
        }
    while(arr.findIndex((item, index, array)=>typeof(array[index])=='number' && typeof(array[index+1])=='number')!=-1)
    {
        let element=arr.findIndex((item, index, array)=>typeof(array[index])=='number' && typeof(array[index+1])=='number');
        arr[element]=arr[element]*10+arr[element+1];
        arr.splice(element+1,1);
    }
    while(arr.findIndex((item, index, array)=>typeof(array[index])=='string' && array[index+1]=='-')!=-1)
    {
        let element=arr.findIndex((item, index, array)=>typeof(array[index])=='string' && array[index+1]=='-');
        arr[element+2]=-arr[element+2];
        arr.splice(element+1,1);
    }
    if(arr[0]=='-' && typeof(arr[1])=='number')
    {
        arr[0]=-arr[1];
        arr.splice(1,1);
    }
    while(arr.join('').match(/[*]|[/]/g)!=null)
    {
        let element_num=arr.findIndex((item, index, array)=>array[index]=='*' || array[index]=='/');
        let element=arr[element_num];
        switch(element)
        {
            case '*':
                arr[element_num-1]=arr[element_num-1]*arr[element_num+1];
                arr.splice(element_num,2); 
                break;
            case '/':
                if(arr[element_num+1]!=0)
                    {
                        arr[element_num-1]=arr[element_num-1]/arr[element_num+1];
                        arr.splice(element_num,2);
                    }
                else 
                    {
                        throw new RangeError("TypeError: Division by zero.");
                    } 
                break;
            default:
                break;
        }
    }
    while(arr.indexOf('-')!=-1)
    {    
        let element=arr.indexOf('-');
        arr[element-1]=arr[element-1]-arr[element+1];
        arr.splice(element,2);
    }    
    while(arr.indexOf('+')!=-1)
    {    
        let element=arr.indexOf('+');
        arr[element-1]=arr[element-1]+arr[element+1];
        arr.splice(element,2);
    } 
    str=str.join('').replace(term,arr[0]);
    term='';
    arr=[];
    str=str.split('');
    }
    for(let count=0;count<str.length;count++)
    {
        if(str[count]==' ')
        {
            continue;
        }
        if(str[count].match(/[0-9]{1}/g)!=null)
        {
            arr.push(+str[count]);
        }
        else
        {
            arr.push(str[count]);
        }
    }
    while(arr.indexOf(".")!=-1)
    {
        let element_num=arr.indexOf(".");
        let arrfir=arr.slice(element_num+1,);
        if(arrfir.join('').search(/[+]|[*]|[/]|[-]/g)!=-1)
        {
            arrfir=arrfir.splice(0,arrfir.join('').search(/[+]|[*]|[/]|[-]/g)).join('');
        }
        else
        {
            arrfir=arrfir.join('');
        }
        arr[element_num]=arrfir;
        arr.splice(element_num+1,arrfir.length);
        let arrsec=arr.slice(0,element_num);
        let elem_num=0;
        if(arrsec.reverse().join('').search(/[+]|[*]|[/]|[-]/g)!=-1 && arrsec.reverse()[0]!='-')
        {
            arrsec.reverse();
            elem_num=arrsec.length-arrsec.join('').search(/[+]|[*]|[/]|[-]/g);
            arrsec.reverse();
            arrsec=arrsec.splice(elem_num,).join('');
        }
        else
        {
            if(arrsec[0]!='-')
            {
                arrsec.reverse();
            }
            arrsec=arrsec.join("");
        }
        arr[elem_num]=arrsec;
        if(arrsec.length!=1)
        {
            arr.splice(elem_num+1,arrsec.length-1);
        }
        arr[elem_num]=+(arr[elem_num]+'.'+arr[elem_num+1]);
        arr.splice(elem_num+1,1);
    }
    while(arr.findIndex((item, index, array)=>typeof(array[index])=='number' && typeof(array[index+1])=='number')!=-1)
    {
        let element=arr.findIndex((item, index, array)=>typeof(array[index])=='number' && typeof(array[index+1])=='number');
        arr[element]=arr[element]*10+arr[element+1];
        arr.splice(element+1,1);
    }
    while(arr.findIndex((item, index, array)=>typeof(array[index])=='string' && array[index+1]=='-')!=-1)
    {
        let element=arr.findIndex((item, index, array)=>typeof(array[index])=='string' && array[index+1]=='-');
        arr[element+2]=-arr[element+2];
        arr.splice(element+1,1);
    }
    while(arr.join('').match(/[*]|[/]/g)!=null)
    {
        let element_num=arr.findIndex((item, index, array)=>array[index]=='*' || array[index]=='/');
        let element=arr[element_num];
        switch(element)
        {
            case '*':
                arr[element_num-1]=arr[element_num-1]*arr[element_num+1];
                arr.splice(element_num,2); 
                break;
            case '/':
                if(arr[element_num+1]!=0)
                    {
                        arr[element_num-1]=arr[element_num-1]/arr[element_num+1];
                        arr.splice(element_num,2);
                    }
                else 
                    {
                        throw new RangeError("TypeError: Division by zero.");
                    } 
                break;
            default:
                break;
        }
    }
    while(arr.indexOf('-')!=-1)
    {    
        let element=arr.indexOf('-');
        arr[element-1]=arr[element-1]-arr[element+1];
        arr.splice(element,2);
    }    
    while(arr.indexOf('+')!=-1)
    {    
        let element=arr.indexOf('+');
        arr[element-1]=arr[element-1]+arr[element+1];
        arr.splice(element,2);
    }      
    return +arr[0].toFixed(4);
}

module.exports = {
    expressionCalculator
}