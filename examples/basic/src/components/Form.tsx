import { Button, Card, CardActions, CardContent, CardHeader, Container, Stack } from '@mui/material';
import { TextField } from '@rekstack/mui-form';
import { useForm, useWatch } from 'react-hook-form';

interface FormValues {
  textField: string;
}

export const Form = () => {
  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      textField: '',
    },
  });
  const values = useWatch({
    control,
  });

  const onSubmit = (data: FormValues) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data));
  };

  return (
    <Stack
      flexDirection='column'
      gap={5}
    >
      <Container maxWidth='sm'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card variant='outlined'>
            <CardHeader title='MUI Form Basic Example' />

            <CardContent>
              <TextField
                control={control}
                label='TextField'
                name='textField'
              />
            </CardContent>

            <CardActions>
              <Button type='submit'>Submit</Button>
            </CardActions>
          </Card>
        </form>
      </Container>

      <Container>
        <Stack
          flexDirection='row'
          gap={5}
          justifyContent='center'
        >
          <Card
            sx={{ minWidth: 300 }}
            variant='outlined'
          >
            <CardHeader title='Values' />
            <CardContent>
              <pre>
                <code>{JSON.stringify(values, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>

          <Card
            sx={{ minWidth: 300 }}
            variant='outlined'
          >
            <CardHeader title='Errors' />
            <CardContent>
              <pre>
                <code>{JSON.stringify(formState.errors, null, 2)}</code>
              </pre>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Stack>
  );
};
