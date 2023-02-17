import { useEffect,  useMemo,  useRef,  useState } from "react";


function PageNav({ dataTotal , setNowPage , onePageNum  }){
    
    const [ page , setPage ] = useState([]);
    const [ ChartNum , setChartNum ] = useState(0);
    
    useEffect(() => {
        async function getchart(){
            let pageChart = await Math.ceil(dataTotal/onePageNum);
            let bigPage = await pageChart%5;

            let pageList = await Array(pageChart).fill().map((el,ind) => {
                return ind+1;
            });

            let divPageList = await Array(bigPage).fill().map((el,ind) => {
                return pageList.splice(0,5);
            });

            setPage(divPageList)
        }
        getchart();
    },[dataTotal , ChartNum ])
 
    return (
        <div>
            {
                page.length !== 0 ? (
                    <div>
                        {
                            ChartNum > 0 ?
                            <p onClick={()=>setChartNum(ChartNum-1)}>prev</p>
                            : <></>
                        }
                        <div>
                            {page[ChartNum].map((el,ind) => {
                                return <p onClick={()=>setNowPage(el)} key={ind}>{el}</p>
                            })}
                        </div>
                        {   
                            page.length >= 2 ??
                            ChartNum  < page.length-1 ? 
                            <p onClick={()=>setChartNum(ChartNum+1)}>next</p>
                            :<></>
                        }
                    </div>
                )
                :
                <></>
            }
        </div>
    )
}

export default PageNav;