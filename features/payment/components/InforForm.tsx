import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import addressApi from '../../../api/addressApi';
import InputField from '../../../components/FormField/InputField';
import { SelectOptions } from '../../../components/FormField/SelectField';
import { IInfor } from '../../../types';
export interface InforFormProps {
  initialValue: IInfor;
  onSubmit: (formvalue: IInfor) => void;
}

export default function InforForm({ initialValue, onSubmit }: InforFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: initialValue,
  });
  const [currentProvince, setCurrentProvince] = useState<any>('');
  const [currentDistrict, setCurrentDistrict] = useState<any>('');
  const [currentWard, setCurrentWard] = useState<any>('');

  const [provincelist, setProvince] = useState<SelectOptions[]>([]);
  const [districtlist, setDistrict] = useState<SelectOptions[]>([]);
  const [wardlist, setWard] = useState<SelectOptions[]>([]);
  useEffect(() => {
    (async () => {
      const res = await addressApi.province();
      const arr = res.data.results.map((state: any) => {
        return {
          label: state.province_name,
          value: state.province_id,
        };
      });
      setProvince(arr);
    })();
  }, []);

  const onChangeProvince = async (event: SelectChangeEvent) => {
    setCurrentProvince(event.target.value as string);
    setCurrentDistrict('');
    setCurrentWard('');
    const res = await addressApi.district(event.target.value);
    const arr = res.data.results.map((state: any) => {
      return {
        label: state.district_name,
        value: state.district_id,
      };
    });
    setDistrict(arr);
    setWard([]);
  };
  const onChangeDistrict = async (event: SelectChangeEvent) => {
    setCurrentDistrict(event.target.value as string);
    setCurrentWard('');
    const res = await addressApi.ward(event.target.value);
    const arr = res.data.results.map((state: any) => {
      return {
        label: state.ward_name,
        value: state.ward_id,
      };
    });
    setWard(arr);
  };
  const onChangeWard = (event: SelectChangeEvent) => {
    setCurrentWard(event.target.value as string);
  };
  const onSubmitForm = (formVale: IInfor) => {
    const newform: IInfor = {
      ...formVale,
      province: provincelist.find((state) => state.value === currentProvince)?.label,
      district: districtlist?.find((state) => state.value === currentDistrict)?.label,
      ward: wardlist?.find((state) => state.value === currentWard)?.label,
    };
    onSubmit(newform);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <InputField name="name" control={control} label="H??? v?? T??n" />
        <InputField name="phone" control={control} label="S??? ??i???n tho???i" />
        <FormControl variant="outlined" fullWidth sx={{ maxHeight: '500px', marginY: '10px' }}>
          <InputLabel id={`province`}>T???nh/Th??nh ph???</InputLabel>
          <Select labelId={`province`} value={currentProvince} onChange={onChangeProvince} label="T???nh/Th??nh ph???">
            <MenuItem disabled value="">
              T???nh/Th??nh ph???
            </MenuItem>
            {provincelist.map((option, idx) => (
              <MenuItem key={idx} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ maxHeight: '500px', marginY: '10px' }}>
          <InputLabel id={`district`}>Qu???n/Huy???n</InputLabel>
          <Select labelId={`district`} value={currentDistrict} onChange={onChangeDistrict} label="Qu???n/Huy???n">
            <MenuItem disabled value="">
              Qu???n/Huy???n
            </MenuItem>
            {districtlist.map((option, idx) => (
              <MenuItem key={idx} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth sx={{ maxHeight: '500px', marginY: '10px' }}>
          <InputLabel id={`ward`}>X??/Ph?????ng/Th??? tr???n</InputLabel>
          <Select labelId={`ward`} value={currentWard} onChange={onChangeWard} label="X??/Ph?????ng/Th??? tr???n">
            <MenuItem disabled value="">
              X??/Ph?????ng/Th??? tr???n
            </MenuItem>
            {wardlist.map((option, idx) => (
              <MenuItem key={idx} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputField name="address" control={control} label="?????a ch??? c??? th???" />
        <Button type="submit" variant="contained" fullWidth disabled={isSubmitting}>
          {isSubmitting && <CircularProgress size={20} color="error" />}
          &nbsp; ?????t H??ng
        </Button>
      </form>
    </Box>
  );
}
