import { useState, useCallback, useEffect } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  makeStyles,
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { TextInput } from '../UIkit'

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
})

const SetSizeArea = (props) => {
  const classes = useStyles()

  const [index, setIndex] = useState(0)
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(0)

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value)
    },
    [setSize]
  )
  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value)
    },
    [setQuantity]
  )

  const addSize = (index, size, quantity) => {
    if (size === '' || quantity === 0) {
      return false
    } else {
      if (index === props.sizes.length) {
        props.setSizes((prevState) => [...prevState, { size: size, quantity: quantity }])
        setIndex(index + 1)
        setSize('')
        setQuantity(0)
      } else {
        const newSizes = props.sizes
        newSizes[index] = { size: size, quantity: quantity }
        props.setSizes(newSizes)
        setIndex(newSizes.length)
        setSize('')
        setQuantity(0)
      }
    }
  }

  const editSize = (index, size, quantity) => {
    setIndex(index)
    setSize(size)
    setQuantity(quantity)
  }

  const deleteSize = (deleteIndex) => {
    const newSizes = props.sizes.filter((item, index) => index !== deleteIndex)
    props.setSizes(newSizes)
  }

  useEffect(() => {
    setIndex(props.sizes.length)
  }, [props.sizes.length])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item, index) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => editSize(index, item.size, item.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => deleteSize(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={'text'}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={'number'}
          />
        </div>
        <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  )
}

export default SetSizeArea
