import { Button, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import { useModalContext } from '../../Context/Modalcon';

const DetailModal = () => {

    const { showmod,selcar ,selcol ,plate,setplate , setdet} = useModalContext();
    const[detail,setDetails]=setdet;

    const handledone = ()=>{
        setDetails(false)
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
    <div className='pt-5 bg-neutral-300 w-[85%] rounded-lg relative px-4'>
<div className='absolute top-2 left-1 text-black' onClick={()=>setDetails(false)}><CloseIcon/></div>
    <div className='flex flex-col px-3 py-5 gap-4 mt-2 '>
<TextField id="outlined-basic" label="Car-Type" variant="outlined" />
<TextField id="outlined-basic" label="Plate Number" variant="outlined" />
<TextField id="outlined-basic" label="Fuel Type" variant="outlined" />
<TextField id="outlined-basic" label="Color" variant="outlined" />
<Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload image
      <VisuallyHiddenInput type="file" />
    </Button>
    <div className='flex justify-center w-full mt-2'>
    <button className='text-black flex items-center px-3 py-2 text-lg rounded-xl border border-black active:bg-white font-semibold '
     onClick={handledone}>
        DONE
        <ThumbUpIcon className='ml-2'
        />
    </button>
    </div>
    
</div>
</div>
</div>

  )
}

export default DetailModal
