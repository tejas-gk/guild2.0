import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUsers from '@/hooks/useUsers';
import { useEditModal } from '@/hooks/useModal';
import Modal from '../Modal';
import Input from '../Input';
import ImageUpload from '../Input/ImageUpload';

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchUser } = useUsers(currentUser?.id);
    const toast = useToast();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [location, setLocation] = useState<string>('');

    useEffect(() => {
        setName(currentUser.name);
        setBio(currentUser?.bio);
        setCoverImage(currentUser?.coverImage);
        setProfileImage(currentUser?.profileImage);
        setUsername(currentUser?.username);
        setLocation(currentUser?.location);
    }, [currentUser]);

    const editModal = useEditModal();

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/users/edit', {
                name,
                bio,
                username,
                profileImage,
                coverImage,
                location,
            });
            mutateFetchUser();
            editModal.onClose();
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Something went wron');
        } finally {
            setIsLoading(false);
        }
    }, [
        name,
        bio,
        username,
        profileImage,
        location,
        coverImage,
        mutateFetchUser,
        editModal,
        toast,
    ]);

    const bodyContent = (
        <div className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-2'>
                <ImageUpload
                    label='Cover image'
                    disabled={isLoading}
                    onChange={(base64) =>
                        setCoverImage(base64 as unknown as File)
                    }
                    value={coverImage}
                />
                <ImageUpload
                    label='Profile image'
                    disabled={isLoading}
                    onChange={(base64) =>
                        setProfileImage(base64 as unknown as File)
                    }
                    value={profileImage}
                    variants='profile'
                />
            </div>
            <Input
                disabled={isLoading}
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                variants='signIn'
            />
            <Input
                disabled={isLoading}
                label='Bio'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
            <Input
                disabled={isLoading}
                label='Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <Input
                disabled={isLoading}
                label='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title='Edit your profile'
            actionLabel='Save'
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default EditModal;
