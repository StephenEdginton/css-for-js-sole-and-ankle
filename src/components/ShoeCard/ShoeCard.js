import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const displayValue = {
    "new-release" : {
      label:'Just Released!'
    },
    "on-sale" : {
      label: 'Sale'
    }

  }
  
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
         <VariantLabel variant={variant}>{displayValue[variant]?.label}</VariantLabel>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};


const VariantLabel = styled.label`
  position:absolute;
  top:12px;
  right:-4px;
  border-radius:2px;
  color: ${COLORS.white};
  background-color: ${p => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
  font-weight: ${WEIGHTS.medium};
  font-size: ${14/16}rem;
  padding: 10px 9px 7px 11px;
  display: ${(p) => p.variant === 'default' ? 'none' : ''};
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
 border-radius: 16px 16px 4px 4px;

`;

const ImageWrapper = styled.div`
  position: relative;
  
`;

const Image = styled.img`
  max-width:300px;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
