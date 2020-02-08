import styled from 'styled-components'

const Loader = styled.div`
  border: 8px solid ${({ theme }) => theme.color.lightGray};
  border-top: 8px solid ${({ theme }) => theme.color.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Loader
