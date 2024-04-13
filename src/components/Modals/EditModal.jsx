/* eslint-disable react/prop-types */
// EditModal.js

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import supabase from '../../helper/SupaClient';
import { useStatusContext } from '../../Context/StatusContext';

const EditModal = ({ vehicleData, onClose }) => {
  const { logid } = useStatusContext();
  const [lid, setLid] = logid;

  const [vehicle, setVehicle] = useState(vehicleData.name);
  const [platenum, setPlate] = useState(vehicleData.plate);
  const [color, setColor] = useState(vehicleData.color);
  const [type, setType] = useState(vehicleData.type);
  const [formerror, setFormerror] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!vehicle || !platenum || !type || !color) {
      setFormerror('Fill in the details correctly');
      return;
    }

    try {
      const { data, error } = await supabase.from('Vehicle_det').update({
        vehicle_name: vehicle,
        plate_num: platenum,
        color: color,
        fuel_type: type,
      }).eq('user_id', lid).select().eq('plate_num', platenum);

      if (error) {
        console.error(error);
        setFormerror('Error updating entry');
      }

      if (data) {
        console.log(data);
        setFormerror(null);
        onClose();
      }
    } catch (error) {
      console.error('Error updating data:', error.message);
      setFormerror('Error updating data');
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-10">
      <div className='pt-5 bg-neutral-300 w-[85%] rounded-lg relative px-4 '>
        <div className='absolute top-2 left-1 text-black' onClick={onClose}>
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
              onClick={handleEdit}>
              SAVE CHANGES
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

export default EditModal;
