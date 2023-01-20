import { Box, Heading, Grid, FormControl, FormLabel, FormErrorMessage, Button, Input as ChakraInput, FormHelperText } from '@chakra-ui/react';
import React, { ComponentProps } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CurrentUser } from '../../types';

interface IInputProps extends Omit<ComponentProps<(typeof Controller)>, 'render'>{
  control: any;
  label?: string;
  helperText?: string;
  inputProps?: ComponentProps<typeof ChakraInput>;

}

const Input: React.FC<IInputProps> = ({name, control, rules = {}, label, helperText, inputProps}) => {
  return (
    <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState, formState }) => (
          <FormControl isInvalid={!!fieldState.error} isRequired={!!rules.required}>
            {!!label && <FormLabel>{label}</FormLabel>}
            <ChakraInput {...field} placeholder={label} {...inputProps} isInvalid={!!fieldState.error}/>
            <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        )}
      />
  )
}

interface IProps {
  currentUser: CurrentUser;
}

const ProfileForm: React.FC<IProps> = ({currentUser}) => {
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      first_name: currentUser?.first_name || '',
      last_name: currentUser?.last_name || '',
      // city: currentUser?.city || '',
      // state: currentUser?.state || '',
      email: currentUser?.email || '',
    }
  });
  const onSubmit = data => console.log(data);

  const isCoach = true; //!!user.coach

  return (
    <Box flex={1} maxWidth={713} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={4}>Personal Information</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Input
          name="first_name"
          label="First Name"
          rules={{ required: 'First name is required.' }}
          control={control}
        />
        <Input
          name="last_name"
          label="Last Name"
          rules={{ required: 'Last name is required.' }}
          control={control}
        />
        <Input
          name="city"
          label="City"
          rules={{ required: 'City is required.' }}
          control={control}
        />
        <Input
          name="state"
          label="State"
          rules={{ required: 'State is required.' }}
          control={control}
        />
      </Grid>
      <Heading mb={4} mt={8}>
        Contact Information
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Input
          name="email"
          label="Email"
          rules={{ required: 'Email is required.' }}
          control={control}
        />
        <Input
          name="phone_number"
          label="Phone Number"
          control={control}
        />
        <Input
          name="linkedin"
          label="LinkedIn"
          control={control}
        />
        {isCoach && (
          <>
            <Input
              name="instagram"
              label="Instagram"
              control={control}
            />
            <Input
              name="facebook"
              label="Facebook"
              control={control}
            />
            <Input
              name="website"
              label="Your Website"
              control={control}
            />
          </>
        )}
      </Grid> 
      {isCoach && (
        <>
          <Heading mt={8}>Mentumm-specific Calendly Booking Link</Heading>
          <Input
            name="Your Website"
            control={control}
            helperText="Enter your Mentumm-specific Calendly Link below"
          />
          <Heading mt={8}>Public Bio</Heading>
          <Input
            name="Your Website"
            control={control}
            helperText="Please limit to one paragraph. You can write about your years of experience, industry, or skills."
          />
        </>
      )}
      <Button type="submit" mt={4}>SAVE</Button>
    </Box>
  );
}

export default ProfileForm;