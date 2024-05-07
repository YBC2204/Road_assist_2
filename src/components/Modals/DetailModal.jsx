import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';
import { useModalContext } from '../../Context/Modalcon';
import { useEffect, useState } from 'react';
import supabase from '../../helper/SupaClient';
import { useStatusContext } from '../../Context/StatusContext';

const DetailModal = () => {
  const { setdet, setmail } = useModalContext();
  const { logid } = useStatusContext();
  const [lid, setLid] = logid;
  const [detail, setDetails] = setdet;
  

  const [vehicle, setVehicle] = useState('');
  const [platenum, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [formerror, setFormerror] = useState(null);

  const handledone = async (e) => {
    e.preventDefault();

    if (!vehicle || !platenum || !type || !color) {
      setFormerror('Fill in the details correctly');
      return;
    }

    try {
      const { data, error } = await supabase.from('Vehicle_det').insert([
        {
          user_id: lid,
          vehicle_name :vehicle,
          plate_num: platenum,
          color: color,
          fuel_type:type,
          // Assuming lid holds the user_id
        },
      ]).select();

      if (error) {
        console.error(error);
        setFormerror('Please fill in fields correctly');
      }

      if (data) {
        console.log(data);
        setFormerror(null);
        setDetails(false);
      }
    } catch (error) {
      console.error('Error inserting data:', error.message);
      setFormerror('Error inserting data');
    }
  };

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
     
      <div className='pt-5 bg-slate-300 w-[85%] rounded-lg relative px-4'>
      <p className="text-center font-bold text-lg uppercase">Vehicle Details</p>
        <div className='absolute top-3 right-6 text-black' onClick={() => setDetails(false)}>
          <CloseIcon />
        </div>
        <div className='flex flex-col px-3 py-5 gap-4 mt-2 '>
          <TextField id="outlined-basic" label="Vehicle Name" variant="outlined"
            value={vehicle} onChange={(e) => setVehicle(e.target.value)}
          />
          <TextField id="outlined-basic" label="Plate Number" variant="outlined"
            value={platenum} onChange={(e) => setPlate(e.target.value)}
          />
          <FormControl variant="filled" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Fuel Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Age"
        >
          <MenuItem value={'Petrol'}>Petrol</MenuItem>
          <MenuItem value={'Diesel'}>Diesel</MenuItem>
         
        </Select>
      </FormControl>
          <TextField id="outlined-basic" label="Color" variant="outlined"
            value={color} onChange={(e) => setColor(e.target.value)}
          />
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
              <ThumbUpIcon className='ml-2' />
            </button>
          </div>

          {formerror && (
            <div className="text-red-500 mt-2 text-sm">{formerror}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
