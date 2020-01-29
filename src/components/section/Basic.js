import React from 'react';
import PropTypes from 'prop-types';
import Image from '../unit/Image';

const Basic = ({ container, height, align, space, tint, color, id, className, source, alternate, children }) => (
    <section
        id={id}
        className={`basic block height-${height} align-${align} background-${source ? 'image' : 'none'} color-${color} ${className || 'no-class'}`}
    >
        {source && <Image className="fit exact-center absolute" source={source} alternate={alternate} />}
        {children && (
            <div className={`zone relative ${space} ${tint}`}>
                <div className={container}>{children}</div>
            </div>
        )}
    </section>
);

Basic.propTypes = {
    container: PropTypes.string,
    height: PropTypes.string,
    align: PropTypes.string,
    space: PropTypes.string,
    tint: PropTypes.string,
    color: PropTypes.number,
    id: PropTypes.string,
    className: PropTypes.string,
    source: PropTypes.any,
    alternate: PropTypes.string,
    children: PropTypes.node,
};

Basic.defaultProps = {
    container: 'container',
    height: 'auto',
    align: 'left',
    space: 'space-xs-50',
    tint: 'tint-none',
    color: 0,
    id: undefined,
    className: undefined,
    source: undefined,
    alternate: undefined,
    children: undefined,
};

export default Basic;
