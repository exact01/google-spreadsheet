import { FC, useCallback, useEffect, useState } from 'react'
import { SingleValue } from 'react-select'
import Reselect from '@/components/UI/reselect/reselect'
import { IProducts } from '@/api/products/products.models'
import { IProduct } from 'backend/service/products/product.interface'
import { nanoid } from 'nanoid'
import { Table, Header, HeaderRow, HeaderCell, Body, Row, Cell } from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui'
import styles from './styles.module.scss'
import { ISelectTemplate } from '@/components/UI/reselect/reslect.interface'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { fetchProductsProvider } from '@/store/slices/products'

interface IProps {
    products: IProducts[] | null
}

export const TableWrapper: FC<IProps> = ({ products }) => {
    const dispatch = useAppDispatch()

    const [currentProductsIds, setCurrentProductsIds] = useState<IProduct[]>([])
    const [selectedValue, setSelectedValue] = useState<SingleValue<ISelectTemplate>>(null)
    const productsFromSeller = useAppSelector(state => state.products.productsFromSeller)
    const getValueTemplate = useCallback(() => {
        return products ? products.map(value => ({
            value: value,
            label: value.name,
        })) : []
    }, [products])
    useEffect(() => {
        if (currentProductsIds.length > 0){
            if (productsFromSeller){
                setCurrentProductsIds(productsFromSeller)
            }
        }
    }, [products])
    const onChangeSelectTemplate = (newValue: SingleValue<ISelectTemplate>) => {
        if (newValue) {
            setCurrentProductsIds(prevState => [...prevState, newValue.value])
        }
        setSelectedValue(null)
    }

    const handleRemove = (id: number) => {
        setCurrentProductsIds(prevState => prevState.filter(value => value.id !== id))
    }

    const data = { nodes: currentProductsIds }
    const materialTheme = getTheme(DEFAULT_OPTIONS)
    const theme = useTheme(materialTheme)

    const onCheckCountProducts = () => {
        if (currentProductsIds){
            const ids = currentProductsIds.map(value => value.id)
            dispatch(fetchProductsProvider({ ids }))
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.reselectContainer}>
                <Reselect
                    getValue={getValueTemplate()}
                    onChangeSelect={onChangeSelectTemplate}
                    placeholder={'Выберите товар'}
                    noOptionsMessage={'Товаров нет'}
                    value={selectedValue}
                />
            </div>

            <Table data={data} theme={theme}>
                {(tableList: IProduct[]) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>ID</HeaderCell>
                                <HeaderCell>Наименование</HeaderCell>
                                <HeaderCell>Описание</HeaderCell>
                                <HeaderCell>Наличие</HeaderCell>
                                <HeaderCell>Действие</HeaderCell>
                            </HeaderRow>
                        </Header>
                        <Body>
                            {tableList.map(item => (
                                <Row key={`${item.id}-${nanoid()}`} item={item}>
                                    <Cell>{item.id}</Cell>
                                    <Cell>{item.name}</Cell>
                                    <Cell>{item.description}</Cell>
                                    <Cell>{item.count}</Cell>
                                    <Cell>
                                        <button type='button' onClick={() => handleRemove(item.id)}>
                                            Удалить
                                        </button>
                                    </Cell>
                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>

            <div className={styles.buttonContainer}>
                <button disabled={currentProductsIds.length === 0} onClick={onCheckCountProducts} className={styles.buttonContainer__button}>Проверить наличие у поставщика</button>
            </div>
        </div>
    )
}
