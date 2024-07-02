import styled from 'styled-components';

const ToolBtn = styled.div`
  line-height: 32px;
  cursor: pointer;
  margin: 0 8px;
  padding: 0 15px;
  border-radius: 5px;
  font-weight: bold;
  &:hover {
    color: #003A8F;
    background-color: #fff;
  }
`

const BtnText = styled.span`
  padding-left: 6px;
`
interface PropsType {
  icon?: any;
  text: string;
  onClick?: any;
  style?: any;
}

export default (props: PropsType) => {
  const { icon, text, onClick } = props
  return (
    <ToolBtn onClick={onClick}>
      {icon}
      <BtnText>{text}</BtnText>
    </ToolBtn>
  )
}