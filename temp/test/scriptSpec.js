describe('view interactions', function () {

    beforeEach(function () {
        this.clickEventStub = sinon.stub(this, 'clickEvent');
    });

    afterEach(function () {
        this.clickEvent.restore();
    });

    describe('when item is clicked', function () {
        it('event is fired', function () {
            this.elem.trigger('click');
            expect(this.clickEventStub).toHaveBeenCalled();
        });
    });
});
