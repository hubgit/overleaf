import PDFToolbarButton from './pdf-toolbar-button'
import { useTranslation } from 'react-i18next'
import OLButtonGroup from '@/shared/components/ol/ol-button-group'

type PdfRotationButtonsProps = {
  rotation: number
  setRotation: (rotation: number) => void
}

function PdfRotationButtons({ rotation, setRotation }: PdfRotationButtonsProps) {
  const { t } = useTranslation()

  return (
    <OLButtonGroup className="pdfjs-toolbar-buttons">
      <PDFToolbarButton
        tooltipId="pdf-controls-rotate-ccw-tooltip"
        label={t('rotate_counter_clockwise')}
        icon="rotate_left"
        onClick={() => setRotation((rotation + 270) % 360)}
      />
      <PDFToolbarButton
        tooltipId="pdf-controls-rotate-cw-tooltip"
        label={t('rotate_clockwise')}
        icon="rotate_right"
        onClick={() => setRotation((rotation + 90) % 360)}
      />
    </OLButtonGroup>
  )
}

export default PdfRotationButtons
