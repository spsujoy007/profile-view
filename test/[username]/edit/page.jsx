'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/components/theme-provider';
import Link from 'next/link';

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EditProfilePage({ params }) {
  const { username } = params;
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';

  // Form state
  const [formData, setFormData] = useState({
    first_name: 'Alex',
    last_name: 'Morgan',
    email: 'alex.morgan@example.com',
    bio: 'Product-minded designer and frontend engineer crafting memorable digital identities.',
    avatar: null,
    cover: null,
  });

  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle avatar image selection
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
    }
  };

  // Handle cover image selection
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewCover(event.target.result);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({
        ...prev,
        cover: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Create FormData to handle file uploads
      const submitData = new FormData();
      submitData.append('first_name', formData.first_name);
      submitData.append('last_name', formData.last_name);
      submitData.append('email', formData.email);
      submitData.append('bio', formData.bio);
      if (formData.avatar) {
        submitData.append('avatar', formData.avatar);
      }
      if (formData.cover) {
        submitData.append('cover', formData.cover);
      }

      // Replace with your actual API endpoint
      const response = await fetch(`/api/users/${username}/edit`, {
        method: 'PUT',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setMessage({
        type: 'success',
        text: 'Profile updated successfully!',
      });

      // Clear file inputs
      if (avatarInputRef.current) avatarInputRef.current.value = '';
      if (coverInputRef.current) coverInputRef.current.value = '';
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const surfaceCard = isLight
    ? 'border-slate-200 bg-white text-slate-900'
    : 'border-white/10 bg-white/[0.03] text-white';
  const inputClass = isLight
    ? 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-slate-400'
    : 'border-white/10 bg-white/5 text-white placeholder-white/40 focus:border-white/20';
  const labelClass = isLight
    ? 'text-slate-700'
    : 'text-white/84';
  const softerText = isLight ? 'text-slate-500' : 'text-white/46';
  const mutedText = isLight ? 'text-slate-600' : 'text-white/60';
  const buttonPrimary = isLight
    ? 'bg-slate-900 text-white hover:bg-slate-800'
    : 'bg-white text-slate-900 hover:bg-slate-100';
  const buttonSecondary = isLight
    ? 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
    : 'border-white/10 bg-white/5 text-white hover:bg-white/8';

  return (
    <div className='space-y-6 pb-10'>
      {/* Header */}
      <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
        <h1 className={joinClasses('text-3xl font-medium tracking-[-0.04em]', isLight ? 'text-slate-950' : 'text-white')}>
          Edit Profile
        </h1>
        <p className={joinClasses('mt-3 text-base', mutedText)}>
          Update your profile information, including your name, bio, and profile images.
        </p>
      </section>

      {/* Message */}
      {message && (
        <div
          className={joinClasses(
            'rounded-[18px] border p-4 text-sm',
            message.type === 'success'
              ? isLight
                ? 'border-green-200 bg-green-50 text-green-800'
                : 'border-green-900/30 bg-green-900/10 text-green-300'
              : isLight
              ? 'border-red-200 bg-red-50 text-red-800'
              : 'border-red-900/30 bg-red-900/10 text-red-300'
          )}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Cover Image Section */}
        <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
          <h2 className={joinClasses('text-xl font-medium', isLight ? 'text-slate-950' : 'text-white')}>
            Cover Image
          </h2>
          <p className={joinClasses('mt-2 text-sm', mutedText)}>
            Upload a cover image for your profile (recommended: 1200x400px)
          </p>

          <div className='mt-4'>
            {previewCover ? (
              <div className='relative h-40 w-full overflow-hidden rounded-[18px]'>
                <img
                  src={previewCover}
                  alt='Cover preview'
                  className='h-full w-full object-cover'
                />
              </div>
            ) : (
              <div
                className={joinClasses(
                  'h-40 w-full rounded-[18px] border-2 border-dashed flex items-center justify-center',
                  isLight
                    ? 'border-slate-300 bg-slate-50'
                    : 'border-white/10 bg-white/5'
                )}
              >
                <p className={joinClasses('text-sm', softerText)}>No cover image selected</p>
              </div>
            )}
            <input
              ref={coverInputRef}
              type='file'
              accept='image/*'
              onChange={handleCoverChange}
              className='mt-3 hidden'
              aria-label='Cover image input'
            />
            <button
              type='button'
              onClick={() => coverInputRef.current?.click()}
              className={joinClasses(
                'mt-3 rounded-[14px] border px-4 py-2 text-sm font-medium transition',
                buttonSecondary
              )}
            >
              Change Cover Image
            </button>
          </div>
        </section>

        {/* Avatar Section */}
        <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
          <h2 className={joinClasses('text-xl font-medium', isLight ? 'text-slate-950' : 'text-white')}>
            Profile Picture
          </h2>
          <p className={joinClasses('mt-2 text-sm', mutedText)}>
            Upload a profile picture (recommended: 400x400px)
          </p>

          <div className='mt-4 flex items-center gap-6'>
            <div className='flex-shrink-0'>
              {previewAvatar ? (
                <div className='h-24 w-24 overflow-hidden rounded-full'>
                  <img
                    src={previewAvatar}
                    alt='Avatar preview'
                    className='h-full w-full object-cover'
                  />
                </div>
              ) : (
                <div
                  className={joinClasses(
                    'h-24 w-24 rounded-full flex items-center justify-center',
                    isLight ? 'bg-slate-200' : 'bg-white/10'
                  )}
                >
                  <p className={joinClasses('text-xs', softerText)}>No image</p>
                </div>
              )}
            </div>
            <input
              ref={avatarInputRef}
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              className='hidden'
              aria-label='Avatar image input'
            />
            <button
              type='button'
              onClick={() => avatarInputRef.current?.click()}
              className={joinClasses(
                'rounded-[14px] border px-4 py-2 text-sm font-medium transition',
                buttonSecondary
              )}
            >
              Change Picture
            </button>
          </div>
        </section>

        {/* Personal Information Section */}
        <section className={joinClasses('rounded-[28px] border p-5 sm:p-6', surfaceCard)}>
          <h2 className={joinClasses('text-xl font-medium', isLight ? 'text-slate-950' : 'text-white')}>
            Personal Information
          </h2>

          <div className='mt-6 space-y-5'>
            {/* First Name */}
            <div>
              <label htmlFor='first_name' className={joinClasses('block text-sm font-medium', labelClass)}>
                First Name
              </label>
              <input
                id='first_name'
                type='text'
                name='first_name'
                value={formData.first_name}
                onChange={handleInputChange}
                required
                maxLength={50}
                className={joinClasses(
                  'mt-2 w-full rounded-[12px] border px-4 py-3 text-sm transition focus:outline-none focus:ring-2',
                  inputClass
                )}
                placeholder='Enter your first name'
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor='last_name' className={joinClasses('block text-sm font-medium', labelClass)}>
                Last Name
              </label>
              <input
                id='last_name'
                type='text'
                name='last_name'
                value={formData.last_name}
                onChange={handleInputChange}
                required
                maxLength={50}
                className={joinClasses(
                  'mt-2 w-full rounded-[12px] border px-4 py-3 text-sm transition focus:outline-none focus:ring-2',
                  inputClass
                )}
                placeholder='Enter your last name'
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className={joinClasses('block text-sm font-medium', labelClass)}>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className={joinClasses(
                  'mt-2 w-full rounded-[12px] border px-4 py-3 text-sm transition focus:outline-none focus:ring-2',
                  inputClass
                )}
                placeholder='Enter your email'
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor='bio' className={joinClasses('block text-sm font-medium', labelClass)}>
                Bio
              </label>
              <p className={joinClasses('mt-1 text-xs', softerText)}>
                {formData.bio.length}/160 characters
              </p>
              <textarea
                id='bio'
                name='bio'
                value={formData.bio}
                onChange={handleInputChange}
                maxLength={160}
                rows={4}
                className={joinClasses(
                  'mt-2 w-full rounded-[12px] border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 resize-none',
                  inputClass
                )}
                placeholder='Tell us about yourself...'
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className='flex gap-3'>
          <button
            type='submit'
            disabled={loading}
            className={joinClasses(
              'rounded-[18px] px-6 py-3 text-sm font-medium transition disabled:opacity-50',
              buttonPrimary
            )}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href={`/${username}`}
            className={joinClasses(
              'rounded-[18px] border px-6 py-3 text-sm font-medium transition',
              buttonSecondary
            )}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
