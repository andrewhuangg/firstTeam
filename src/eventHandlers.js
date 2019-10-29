export const handleScatterStat = (selection, props) => {
  const { 
    options,
    onOptionClicked,
    selectedOption
   } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
   .on('change', function() { //using function to preserve the keyword this
     onOptionClicked(this.value);
   });

  const option = select.selectAll('option').data(options);
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);

};

export const handleScatterYear = (selection, props) => {
  const {
    options,
    onOptionClicked,
  } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
    .on('change', function () {
      onOptionClicked(this.value);
    });

  const option = select.selectAll('option').data(options)
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .text(d => d);
};

export const handleScatterPos = (selection, props) => {
  const {
    options,
    onOptionClicked,
    selectedOption
  } = props;

  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select').merge(select)
    .on('change', function () {
      onOptionClicked(this.value)
    });

  const option = select.selectAll('option').data(options)
  option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};


//attempted to create one massive event handler for DRY code.
// export const handleScatter = (selection, props) => {
//   const {
//     xCol,
//     years,
//     pos,
//     onOptionClicked,
//     selectedOption
//   } = props;

//   let select = selection.selectAll('select').data([null]);
//   select = select.enter().append('select').merge(select)
//     .on('change', function () { //using function to preserve the keyword this
//       onOptionClicked(this.value)
//     });

//   const xColumn = select.selectAll('option').data(xCol)
//   xColumn.enter().append('option').merge(xColumn)
//     .attr('value', d => d)
//     .text(d => d);

//   const yearSelection = select.selectAll('option').data(years)
//   yearSelection.enter().append('option').merge(xColumn)
//     .attr('value', d => d)
//     .text(d => d);

//   const posSelection = select.selectAll('option').data(pos)
//   posSelection.enter().append('option').merge(posSelection)
//     .attr('value', d => d)
//     .text(d => d);
// };