import { Button, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/FormField/InputField';
import SelecField from '../../../components/FormField/SelectField';
import { IProduct } from '../../../types';
import { selectFormCategory } from '../../category/categorySlice';
import TextField from '@mui/material/TextField';

export interface ProductFormProps {
  initialValue: Partial<IProduct>;
  onSubmit: (formValue: IProduct) => void;
}

export default function ProductForm({ initialValue, onSubmit }: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Partial<IProduct>>({
    defaultValues: initialValue,
  });
  const [colorlist, setColorlist] = React.useState<string[]>([]);
  const [color, setColor] = React.useState('');
  const [capacity, setCapacity] = React.useState('');
  const [capacitylist, setCapacityList] = React.useState<string[]>([]);
  React.useEffect(() => {
    setColorlist([...(initialValue.color as string[])]);
    setCapacityList([...(initialValue.capacity as string[])]);
  }, [initialValue]);
  const submitForm = async (formValue: IProduct) => {
    const newForm: IProduct = {
      ...formValue,
      capacity: capacitylist,
      color: colorlist,
    };
    await onSubmit(newForm);
  };
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };
  const addColor = () => {
    setColorlist([...colorlist, color]);
    setColor('');
  };
  const handleChangeCapacity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(event.target.value);
  };
  const addCapacity = () => {
    setCapacityList([...capacitylist, capacity]);
    setCapacity('');
  };
  const categoryOpions = useAppSelector(selectFormCategory);
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InputField name="title" label="Tiêu đề" control={control} />
      <InputField name="price" label="Giá" type="number" control={control} />
      <SelecField name="category" label="Category" control={control} options={categoryOpions} />
      <InputField multiline={true} minRows={2} maxRows={10} name="description" label="Mô tả" control={control} />
      <InputField multiline={true} minRows={2} maxRows={10} name="content" label="Nội dung" control={control} />
      <InputField name="sold" type="number" label="Đã bán" control={control} />
      <InputField name="inStock" type="number" label="Kho" control={control} />
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <TextField onChange={handleChangeColor} label="Color" name="color" value={color} />
          <Button onClick={addColor} variant="outlined" color="primary" sx={{ width: '40px' }}>
            Add
          </Button>
          <TextField onChange={handleChangeCapacity} label="Capacity" name="capacity" value={capacity} />
          <Button onClick={addCapacity} variant="outlined" color="primary" sx={{ width: '40px' }}>
            Add
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {colorlist.map((state, idx) => (
            <Typography sx={{ border: '1px solid #999', borderRadius: '5px', margin: '8px', padding: '8px' }} key={idx}>
              {state}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {capacitylist.map((state, idx) => (
            <Typography sx={{ border: '1px solid #999', borderRadius: '5px', margin: '8px', padding: '8px' }} key={idx}>
              {state}
            </Typography>
          ))}
        </Box>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        disabled={isSubmitting}
        type="submit"
        sx={{ marginY: '20px', width: '100%' }}
      >
        {isSubmitting && <CircularProgress size={20} color="primary" />}
        &nbsp; Submit
      </Button>
    </form>
  );
}
