// /** * @jest-environment jsdom */
import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import Login from './Login';

expect.extend(matchers);

describe('LoginInput Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email correctly', async () => {
    render(
      <Login
        onLogin={() => {}}
        emailLogin="test123@gmail.com"
        passwordLogin=""
        setEmailLogin={() => {}}
        setPasswordLogin={() => {}}
        toggleToRegister={() => {}}
      />
    );

    const emailInput = await screen.getByPlaceholderText('Email');

    await userEvent.type(emailInput, 'test123@gmail.com');

    expect(emailInput).toHaveValue('test123@gmail.com');
  });

  it('should handle password correctly', async () => {
    render(
      <Login
        onLogin={() => {}}
        emailLogin=""
        passwordLogin="passwordTest"
        setEmailLogin={() => {}}
        setPasswordLogin={() => {}}
        toggleToRegister={() => {}}
      />
    );

    const passwordInput = await screen.getByPlaceholderText('Password');

    await userEvent.type(passwordInput, 'passwordTest');

    expect(passwordInput).toHaveValue('passwordTest');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(
      <Login
        onLogin={mockLogin}
        emailLogin="test123@gmail.com"
        passwordLogin="passwordTest"
        setEmailLogin={() => {}}
        setPasswordLogin={() => {}}
        toggleToRegister={() => {}}
      />
    );
 
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      emailLogin: 'test123@gmail.com',
      passwordLogin: 'passwordTest',
    });
  });
});
