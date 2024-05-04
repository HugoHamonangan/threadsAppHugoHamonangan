/** * @jest-environment jsdom */

import React from 'react';
import { Provider } from 'react-redux'; // Import Provider
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import Comments from './Comments';
import { asyncAddComments } from '../states/comments/action';
import store from '../states/index';

expect.extend(matchers);

describe('Comments Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle Comments Correctly', async () => {
    render(
      <Provider store={store}>
        <Comments
          threadDetails={() => {}}
          addComments={() => {}}
          comment="commentTest"
          setComment={() => {}}
        />
      </Provider>
    );

    const CommentInput = await screen.getByPlaceholderText('comment');

    await userEvent.type(CommentInput, 'commentTest');

    expect(CommentInput).toHaveValue('commentTest');
  });

  it('should call submit function when submit button is clicked', async () => {
    const mockComments = vi.fn();
  
    render(
      <Provider store={store}>
        <Comments
          threadDetails={{ id: 'threadId' }}
          addComments={mockComments}
          comment="commentTest"
          setComment={() => {}}
        />
      </Provider>
    );
  
    const submitButton = await screen.getByRole('button', { name: 'Kirim' });
  
    await userEvent.click(submitButton);
  
    expect(mockComments).toHaveBeenCalledWith({
      threadId: 'threadId',
      commentThread: 'commentTest',
    });
  });
  
});
