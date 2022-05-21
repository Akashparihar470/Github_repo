import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Githubrepo = () => {
    const [text,setText] = useState("");
    const [query,setQuery] = useState("");
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [starorder,setStarorder] = useState("asc")


   const getrepo = (query,page,starorder)=>{
       axios("https://api.github.com/search/repositories",{
           params:{
               q:query,
               per_page:5,
               page:page,
               sort:"stars",
               order:starorder
           }
       }).then(res=> setData(res.data.items))
       
       .catch(err=>console.log(err))
   }
        //   console.log(data)

        const Pagination = ({
            currentPage,
            lastPage,
            onPagechange
        })=>{
            const arr = new Array(lastPage).fill(0);
            return(
                <div>
                    {
                        arr.map((item,page)=> <button disabled={(page+1)===currentPage} onClick={()=>onPagechange(page+1)}>{page+1}</button>)
                    }
                </div>
            )
        }

   useEffect(()=>{
       getrepo(query,page,starorder);
   },[query,page,starorder])

   const handleclick = ()=>{
       return setQuery(text)
   }
  return (
    <div>
        <h1>Github Repo</h1>
        <input type="text" onChange={e=>setText(e.target.value)}/>
        <button onClick={handleclick}>submit</button>
        <div>
            <div style={{display:"flex"}}>
                <button disabled={starorder === "asc"} onClick={()=>setStarorder("asc")}>Sort by stars asc</button>
                <button  disabled={starorder === "desc"} onClick={()=>setStarorder("desc")}>Sort by stars desc</button>
            </div>
            <button disabled={page===1} onClick={()=>{setPage(page-1)}}>prev</button>
            <Pagination currentPage={page} lastPage={6} onPagechange={setPage}/>
            <button  onClick={()=>{setPage(page+1)}}>next</button>
        </div>
        {data.map(e => 
           <div style={{display:"flex", padding:"10px", border:"1px solid black"}} key={e.id}>
               <img width={"60px"} src={e.owner.avatar_url} alt="avatar" />
               <h5 style={{margin:"10px"}}>{e.full_name}</h5></div>)}
    </div>
  )
}

export default Githubrepo